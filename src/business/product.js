const ProductDA = require('../dataaccess/product');
const UserDA = require('../dataaccess/user')
const { RESULT_CODES } = require('../utils/index')

const createProduct = async ({
  titulo,
  descripcion,
  tipo_trato,
  foto,
  cantidad,
  userId
}) => {
  try {
    const product = await ProductDA.createProduct({
      titulo,
      descripcion,
      tipo_trato,
      foto,
      cantidad,
      userId
    })

    return product
  } catch (error) {
    throw new Error(error);
  }
}

const getAllProducts = async () => {
  try {
    const products = await ProductDA.getAllProducts()

    const productClean = products.map((info) => ({
      id: info.id,
      titulo: info.titulo,
      descripcion: info.descripcion,
      tipo_trato: info.tipo_trato,
      foto: info.foto,
      cantidad: info.cantidad,
      userId: info.userId,
      categorias: info.categoria.map((info) => (
        info.categoria.nombre
      )),
    }));

    return productClean
  } catch (error) {
    throw new Error(error);
  }
}

const getProductById = async ({ id }) => {
  try {
    const product = await ProductDA.getProductById({ id });

    if (!product) {
      return {
        code: RESULT_CODES.PRODUCT_NOT_FOUND,
      }
    }

    return {
      product,
      code: RESULT_CODES.SUCCESS
    }
  } catch (error) {
    throw new Error(error);
  }
}

const getProductsByCategory = async ({userId}) => {
  try {
    const products = await ProductDA.getProductsByCategory({userId})

    const cleanProd = products.map(({nombre, producto}) => ({
      categoria: nombre,
      producto: producto.map((info) => (
        info.producto
      ))
    }))

    return {
      Productos: cleanProd,
      code: RESULT_CODES.SUCCESS
    }
  } catch (error) {
    throw new Error(error)
  }
};

const getMyProducts = async ({userId}) => {
  try {

    if (!await UserDA.getUserByProps({id: userId})) {
      return {
        code: RESULT_CODES.USER_NOT_FOUND
      }
    }

    const products = await ProductDA.getMyProducts({userId})

    return {
      productos: products,
      code: RESULT_CODES.SUCCESS
    }
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = {
  getMyProducts,
  getProductsByCategory,
  createProduct,
  getAllProducts,
  getProductById,
}